// Database connection utilities for Bonjoojoo
// This provides a foundation for database operations

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  pool?: {
    min: number;
    max: number;
    acquireTimeoutMs: number;
    idleTimeoutMs: number;
  };
}

export interface QueryResult<T = any> {
  rows: T[];
  rowCount: number;
  command: string;
}

// Abstract database interface for future flexibility
export interface DatabaseConnection {
  query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>>;
  transaction<T>(fn: (client: DatabaseConnection) => Promise<T>): Promise<T>;
  close(): Promise<void>;
}

// Mock database implementation for development
export class MockDatabase implements DatabaseConnection {
  private connected = false;

  constructor(private config: DatabaseConfig) {}

  async connect(): Promise<void> {
    console.log(`Connecting to database: ${this.config.host}:${this.config.port}/${this.config.database}`);
    this.connected = true;
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<QueryResult<T>> {
    if (!this.connected) {
      throw new Error('Database not connected');
    }

    console.log('Executing query:', sql, params);
    
    // Mock different query types
    if (sql.toLowerCase().includes('select')) {
      return this.mockSelect<T>(sql, params);
    } else if (sql.toLowerCase().includes('insert')) {
      return this.mockInsert<T>(sql, params);
    } else if (sql.toLowerCase().includes('update')) {
      return this.mockUpdate<T>(sql, params);
    } else if (sql.toLowerCase().includes('delete')) {
      return this.mockDelete<T>(sql, params);
    }

    return { rows: [], rowCount: 0, command: 'UNKNOWN' };
  }

  async transaction<T>(fn: (client: DatabaseConnection) => Promise<T>): Promise<T> {
    console.log('Starting transaction');
    try {
      const result = await fn(this);
      console.log('Transaction committed');
      return result;
    } catch (error) {
      console.log('Transaction rolled back');
      throw error;
    }
  }

  async close(): Promise<void> {
    this.connected = false;
    console.log('Database connection closed');
  }

  private mockSelect<T>(sql: string, params: any[]): QueryResult<T> {
    // Mock data based on table being queried
    if (sql.includes('users')) {
      return {
        rows: [{
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'user@example.com',
          first_name: 'John',
          last_name: 'Doe',
          created_at: new Date().toISOString()
        }] as T[],
        rowCount: 1,
        command: 'SELECT'
      };
    }

    if (sql.includes('products')) {
      return {
        rows: [{
          id: '456e7890-e89b-12d3-a456-426614174001',
          sku: 'LGD-RD-150',
          name: '1.5ct Round Lab-Grown Diamond',
          price: 3500.00,
          category: 'engagement_rings'
        }] as T[],
        rowCount: 1,
        command: 'SELECT'
      };
    }

    if (sql.includes('orders')) {
      return {
        rows: [{
          id: '789e1234-e89b-12d3-a456-426614174002',
          order_number: 'BJ-2024-001',
          status: 'completed',
          total: 4250.00,
          created_at: new Date().toISOString()
        }] as T[],
        rowCount: 1,
        command: 'SELECT'
      };
    }

    return { rows: [], rowCount: 0, command: 'SELECT' };
  }

  private mockInsert<T>(sql: string, params: any[]): QueryResult<T> {
    const mockId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return {
      rows: [{ id: mockId, ...params[0] }] as T[],
      rowCount: 1,
      command: 'INSERT'
    };
  }

  private mockUpdate<T>(sql: string, params: any[]): QueryResult<T> {
    return {
      rows: [],
      rowCount: 1,
      command: 'UPDATE'
    };
  }

  private mockDelete<T>(sql: string, params: any[]): QueryResult<T> {
    return {
      rows: [],
      rowCount: 1,
      command: 'DELETE'
    };
  }
}

// Database factory
export class DatabaseFactory {
  static create(config: DatabaseConfig): DatabaseConnection {
    // In production, this would create actual database connections
    // For now, return mock implementation
    return new MockDatabase(config);
  }

  static createFromEnv(): DatabaseConnection {
    const config: DatabaseConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'bonjoojoo',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      ssl: process.env.NODE_ENV === 'production',
      pool: {
        min: 2,
        max: 10,
        acquireTimeoutMs: 30000,
        idleTimeoutMs: 30000
      }
    };

    return DatabaseFactory.create(config);
  }
}

// Connection pool manager
export class ConnectionPool {
  private static instance: ConnectionPool;
  private connections: Map<string, DatabaseConnection> = new Map();

  static getInstance(): ConnectionPool {
    if (!ConnectionPool.instance) {
      ConnectionPool.instance = new ConnectionPool();
    }
    return ConnectionPool.instance;
  }

  getConnection(name = 'default'): DatabaseConnection {
    if (!this.connections.has(name)) {
      const connection = DatabaseFactory.createFromEnv();
      this.connections.set(name, connection);
    }
    return this.connections.get(name)!;
  }

  async closeAll(): Promise<void> {
    for (const connection of this.connections.values()) {
      await connection.close();
    }
    this.connections.clear();
  }
}

// Query builder helpers
export class QueryBuilder {
  static select(table: string, columns: string[] = ['*']): SelectBuilder {
    return new SelectBuilder(table, columns);
  }

  static insert(table: string): InsertBuilder {
    return new InsertBuilder(table);
  }

  static update(table: string): UpdateBuilder {
    return new UpdateBuilder(table);
  }

  static delete(table: string): DeleteBuilder {
    return new DeleteBuilder(table);
  }
}

export class SelectBuilder {
  private whereClauses: string[] = [];
  private orderClauses: string[] = [];
  private limitValue?: number;
  private offsetValue?: number;

  constructor(private table: string, private columns: string[]) {}

  where(condition: string, value?: any): this {
    if (value !== undefined) {
      this.whereClauses.push(`${condition} = $${this.whereClauses.length + 1}`);
    } else {
      this.whereClauses.push(condition);
    }
    return this;
  }

  orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderClauses.push(`${column} ${direction}`);
    return this;
  }

  limit(count: number): this {
    this.limitValue = count;
    return this;
  }

  offset(count: number): this {
    this.offsetValue = count;
    return this;
  }

  build(): { sql: string; params: any[] } {
    let sql = `SELECT ${this.columns.join(', ')} FROM ${this.table}`;
    const params: any[] = [];

    if (this.whereClauses.length > 0) {
      sql += ` WHERE ${this.whereClauses.join(' AND ')}`;
    }

    if (this.orderClauses.length > 0) {
      sql += ` ORDER BY ${this.orderClauses.join(', ')}`;
    }

    if (this.limitValue) {
      sql += ` LIMIT ${this.limitValue}`;
    }

    if (this.offsetValue) {
      sql += ` OFFSET ${this.offsetValue}`;
    }

    return { sql, params };
  }
}

export class InsertBuilder {
  private values: Record<string, any> = {};

  constructor(private table: string) {}

  set(column: string, value: any): this {
    this.values[column] = value;
    return this;
  }

  setMultiple(data: Record<string, any>): this {
    Object.assign(this.values, data);
    return this;
  }

  build(): { sql: string; params: any[] } {
    const columns = Object.keys(this.values);
    const placeholders = columns.map((_, i) => `$${i + 1}`);
    const params = Object.values(this.values);

    const sql = `INSERT INTO ${this.table} (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;
    
    return { sql, params };
  }
}

export class UpdateBuilder {
  private values: Record<string, any> = {};
  private whereClauses: string[] = [];

  constructor(private table: string) {}

  set(column: string, value: any): this {
    this.values[column] = value;
    return this;
  }

  where(condition: string, value?: any): this {
    if (value !== undefined) {
      this.whereClauses.push(`${condition} = $${Object.keys(this.values).length + this.whereClauses.length + 1}`);
    } else {
      this.whereClauses.push(condition);
    }
    return this;
  }

  build(): { sql: string; params: any[] } {
    const setClause = Object.keys(this.values)
      .map((column, i) => `${column} = $${i + 1}`)
      .join(', ');

    let sql = `UPDATE ${this.table} SET ${setClause}`;
    const params = Object.values(this.values);

    if (this.whereClauses.length > 0) {
      sql += ` WHERE ${this.whereClauses.join(' AND ')}`;
    }

    sql += ' RETURNING *';

    return { sql, params };
  }
}

export class DeleteBuilder {
  private whereClauses: string[] = [];

  constructor(private table: string) {}

  where(condition: string): this {
    this.whereClauses.push(condition);
    return this;
  }

  build(): { sql: string; params: any[] } {
    let sql = `DELETE FROM ${this.table}`;
    const params: any[] = [];

    if (this.whereClauses.length > 0) {
      sql += ` WHERE ${this.whereClauses.join(' AND ')}`;
    }

    return { sql, params };
  }
}

// Database health check
export async function checkDatabaseHealth(): Promise<{
  status: 'healthy' | 'unhealthy';
  responseTime: number;
  error?: string;
}> {
  const startTime = Date.now();
  
  try {
    const db = ConnectionPool.getInstance().getConnection();
    await db.query('SELECT 1 as health_check');
    
    return {
      status: 'healthy',
      responseTime: Date.now() - startTime
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}