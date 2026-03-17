import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';

const authService = new AuthService();

interface PerformanceMetric {
  timestamp: string;
  metric: string;
  value: number;
  device_type?: string;
  page_type?: string;
  user_id?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Optional authentication for detailed metrics
    let user = null;
    const authHeader = request.headers.get('authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      // Skip auth for now - focus on animations
      // const authResult = await authService.verifyToken(token);
      // if (authResult.success) {
      //   user = authResult.user;
      // }
    }

    const url = new URL(request.url);
    const timeframe = url.searchParams.get('timeframe') || '24h';
    const metric = url.searchParams.get('metric');
    const page = url.searchParams.get('page');
    const device = url.searchParams.get('device');

    // Get performance metrics
    const metrics = await getPerformanceMetrics({
      timeframe,
      metric,
      page,
      device,
      includeDetailed: !!user
    });

    return NextResponse.json({
      timeframe,
      generatedAt: new Date().toISOString(),
      metrics: metrics.data,
      summary: metrics.summary,
      benchmark: metrics.benchmark
    });

  } catch (error) {
    console.error('Performance metrics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const performanceData = await request.json();

    // Validate required fields
    if (!performanceData.metrics || !Array.isArray(performanceData.metrics)) {
      return NextResponse.json(
        { error: 'Metrics array is required' },
        { status: 400 }
      );
    }

    // Process performance metrics
    const processedMetrics: PerformanceMetric[] = [];
    
    for (const metric of performanceData.metrics) {
      if (!metric.name || typeof metric.value !== 'number') {
        continue; // Skip invalid metrics
      }

      const enrichedMetric: PerformanceMetric = {
        timestamp: metric.timestamp || new Date().toISOString(),
        metric: metric.name,
        value: metric.value,
        device_type: metric.device_type || detectDeviceType(request.headers.get('user-agent')),
        page_type: metric.page_type || 'unknown',
        user_id: performanceData.user_id
      };

      processedMetrics.push(enrichedMetric);
    }

    // Store metrics and analyze performance
    await Promise.all([
      storePerformanceMetrics(processedMetrics),
      analyzePerformanceAlerts(processedMetrics),
      updatePerformanceBenchmarks(processedMetrics)
    ]);

    return NextResponse.json({
      processed: processedMetrics.length,
      status: 'success',
      alerts: await checkPerformanceAlerts(processedMetrics)
    });

  } catch (error) {
    console.error('Performance data ingestion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function getPerformanceMetrics(params: any) {
  // Mock performance data - in production this would query a metrics database
  const mockData = {
    data: [
      {
        timestamp: new Date().toISOString(),
        fcp: 1.2, // First Contentful Paint
        lcp: 2.1, // Largest Contentful Paint
        cls: 0.05, // Cumulative Layout Shift
        fid: 8, // First Input Delay
        ttfb: 0.3, // Time to First Byte
        page_type: 'product',
        device_type: 'mobile'
      },
      {
        timestamp: new Date().toISOString(),
        fcp: 0.9,
        lcp: 1.8,
        cls: 0.03,
        fid: 5,
        ttfb: 0.2,
        page_type: 'homepage',
        device_type: 'desktop'
      }
    ],
    summary: {
      avg_fcp: 1.05,
      avg_lcp: 1.95,
      avg_cls: 0.04,
      avg_fid: 6.5,
      avg_ttfb: 0.25,
      core_web_vitals_score: 95,
      mobile_score: 92,
      desktop_score: 98
    },
    benchmark: {
      industry_avg_fcp: 1.8,
      industry_avg_lcp: 2.5,
      industry_avg_cls: 0.1,
      luxury_ecommerce_avg: {
        fcp: 1.5,
        lcp: 2.2,
        cls: 0.08
      }
    }
  };

  return mockData;
}

async function storePerformanceMetrics(metrics: PerformanceMetric[]): Promise<void> {
  try {
    // Store in time-series database for real-time performance monitoring
    console.log('Storing performance metrics:', metrics.length, 'data points');
    
    // In production, store in InfluxDB, TimescaleDB, or similar
    // for real-time performance dashboards and alerting
    
  } catch (error) {
    console.error('Failed to store performance metrics:', error);
  }
}

async function analyzePerformanceAlerts(metrics: PerformanceMetric[]): Promise<void> {
  try {
    const alerts = [];
    
    for (const metric of metrics) {
      // Check Core Web Vitals thresholds
      if (metric.metric === 'lcp' && metric.value > 2.5) {
        alerts.push({
          type: 'performance_alert',
          metric: 'lcp',
          value: metric.value,
          threshold: 2.5,
          severity: 'high',
          message: 'LCP exceeds recommended threshold for luxury ecommerce'
        });
      }
      
      if (metric.metric === 'fcp' && metric.value > 1.8) {
        alerts.push({
          type: 'performance_alert',
          metric: 'fcp',
          value: metric.value,
          threshold: 1.8,
          severity: 'medium',
          message: 'FCP slower than recommended for jewelry shopping experience'
        });
      }
      
      if (metric.metric === 'cls' && metric.value > 0.1) {
        alerts.push({
          type: 'performance_alert',
          metric: 'cls',
          value: metric.value,
          threshold: 0.1,
          severity: 'high',
          message: 'CLS too high - may affect diamond viewing experience'
        });
      }
    }
    
    if (alerts.length > 0) {
      console.log('Performance alerts triggered:', alerts);
      // In production, send to monitoring system (Sentry, DataDog, etc.)
    }
    
  } catch (error) {
    console.error('Failed to analyze performance alerts:', error);
  }
}

async function updatePerformanceBenchmarks(metrics: PerformanceMetric[]): Promise<void> {
  try {
    // Update running averages and benchmarks
    // This helps track performance trends over time
    console.log('Updating performance benchmarks with', metrics.length, 'new data points');
    
  } catch (error) {
    console.error('Failed to update performance benchmarks:', error);
  }
}

async function checkPerformanceAlerts(metrics: PerformanceMetric[]): Promise<any[]> {
  const alerts = [];
  
  // Check for performance degradations
  const recentLCP = metrics.filter(m => m.metric === 'lcp');
  if (recentLCP.length > 0) {
    const avgLCP = recentLCP.reduce((sum, m) => sum + m.value, 0) / recentLCP.length;
    if (avgLCP > 2.5) {
      alerts.push({
        type: 'performance_degradation',
        metric: 'lcp',
        average: avgLCP,
        recommendation: 'Optimize image loading and server response times'
      });
    }
  }
  
  return alerts;
}

function detectDeviceType(userAgent: string | null): string {
  if (!userAgent) return 'unknown';
  
  if (/Mobile|Android|iPhone|iPad/i.test(userAgent)) {
    return 'mobile';
  }
  
  if (/Tablet|iPad/i.test(userAgent)) {
    return 'tablet';
  }
  
  return 'desktop';
}