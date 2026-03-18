'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Award, Leaf, Diamond } from 'lucide-react'
import { LuxuryReveal, LuxuryParallax } from '@/components/animations/LuxuryAnimationSystem'

export default function LabGrownDiamondsPage() {
  return (
    <div className="hero-page-content bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/diamonds-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-3xl px-8">
          <LuxuryReveal direction="up" delay={0.1}>
            <p className="text-overline text-white/80 mb-4">The Future of Fine Jewelry</p>
          </LuxuryReveal>
          <LuxuryReveal direction="up" delay={0.25}>
            <h1 className="text-display-hero text-white mb-6 drop-shadow-md">
              Lab-Grown<br />
              <span className="italic font-light">Diamonds</span>
            </h1>
          </LuxuryReveal>
          <LuxuryReveal direction="up" delay={0.4}>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Same fire. Same brilliance. Same beauty. 95% less environmental impact.
            </p>
          </LuxuryReveal>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-bj">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <LuxuryReveal direction="left">
              <div>
                <h2 className="text-display-md text-bj-black mb-6">
                  Identical in every way.<br />
                  <span className="italic font-light">Better for the planet.</span>
                </h2>
                <p className="text-body-lg mb-6">
                  Lab-grown diamonds are real diamonds - chemically, physically, and optically identical to mined diamonds. Created in controlled laboratory environments using advanced technology that replicates the natural diamond formation process.
                </p>
                <p className="text-body mb-8">
                  The only difference? They're grown above ground in weeks, not underground over billions of years. This means the same exceptional quality with a fraction of the environmental impact.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-bj-black mb-2">95% Less Impact</h4>
                    <p className="text-sm text-bj-gray-500">Dramatically reduced carbon footprint</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-bj-black mb-2">100% Real</h4>
                    <p className="text-sm text-bj-gray-500">IGI & GIA certified diamonds</p>
                  </div>
                </div>
              </div>
            </LuxuryReveal>

            <LuxuryReveal direction="right" delay={0.2}>
              <div className="relative">
                <Image
                  src="/images/lab-grown-education.png"
                  alt="Lab-grown diamond formation process"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </LuxuryReveal>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-bj-gray-50">
        <div className="container-bj">
          <LuxuryReveal direction="up" className="text-center mb-16">
            <h2 className="text-display-md text-bj-black mb-6">Why Choose Lab-Grown?</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Discover the advantages of choosing lab-grown diamonds for your fine jewelry.
            </p>
          </LuxuryReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Sustainable',
                description: '95% less environmental impact than mined diamonds'
              },
              {
                icon: CheckCircle,
                title: 'Conflict-Free',
                description: 'Guaranteed ethical sourcing with complete transparency'
              },
              {
                icon: Diamond,
                title: 'Identical Quality',
                description: 'Same chemical, physical, and optical properties as mined diamonds'
              },
              {
                icon: Award,
                title: 'Certified',
                description: 'IGI and GIA certified for quality and authenticity'
              }
            ].map((benefit, index) => (
              <LuxuryReveal key={benefit.title} direction="up" delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-bj-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-bj-black mb-4">{benefit.title}</h3>
                  <p className="text-body text-bj-gray-500">{benefit.description}</p>
                </div>
              </LuxuryReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-bj">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <LuxuryReveal direction="left">
              <div className="relative">
                <Image
                  src="/images/lab-grown-education.png"
                  alt="Diamond crystal formation"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </LuxuryReveal>

            <LuxuryReveal direction="right" delay={0.2}>
              <div>
                <h2 className="text-display-md text-bj-black mb-6">
                  The Science Behind<br />
                  <span className="italic font-light">Lab-Grown Diamonds</span>
                </h2>
                <p className="text-body-lg mb-6">
                  Lab-grown diamonds are created using two primary methods: Chemical Vapor Deposition (CVD) and High Pressure High Temperature (HPHT). Both processes recreate the extreme conditions found deep within the Earth.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-bj-black mb-2">CVD Process</h4>
                    <p className="text-sm text-bj-gray-500">
                      Carbon atoms are deposited layer by layer onto a diamond seed in a controlled chamber.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-bj-black mb-2">HPHT Process</h4>
                    <p className="text-sm text-bj-gray-500">
                      Replicates the high pressure and temperature conditions that form diamonds naturally.
                    </p>
                  </div>
                </div>
              </div>
            </LuxuryReveal>
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-20 bg-bj-gray-50">
        <div className="container-bj">
          <LuxuryReveal direction="up" className="text-center mb-16">
            <h2 className="text-display-md text-bj-black mb-6">Certified Excellence</h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-8">
              Every Bonjoojoo lab-grown diamond comes with certification from leading gemological institutes.
            </p>
          </LuxuryReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <LuxuryReveal direction="left">
              <div className="text-center">
                <Image
                  src="/images/igi-logo.png"
                  alt="IGI Certification"
                  width={200}
                  height={100}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-bj-black mb-2">IGI Certified</h3>
                <p className="text-body text-bj-gray-500">
                  International Gemological Institute certification ensures quality and authenticity.
                </p>
              </div>
            </LuxuryReveal>

            <LuxuryReveal direction="right" delay={0.2}>
              <div className="text-center">
                <Image
                  src="/images/gia-logo.png"
                  alt="GIA Certification"
                  width={200}
                  height={100}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-bj-black mb-2">GIA Certified</h3>
                <p className="text-body text-bj-gray-500">
                  Gemological Institute of America grading provides the highest standard of assessment.
                </p>
              </div>
            </LuxuryReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bj-black text-white">
        <div className="container-bj text-center">
          <LuxuryReveal direction="up">
            <h2 className="text-display-md mb-6">
              Ready to Discover<br />
              <span className="italic font-light">Lab-Grown Luxury?</span>
            </h2>
            <p className="text-body-lg mb-8 max-w-2xl mx-auto">
              Explore our selection of lab-grown diamond jewelry and experience the future of fine jewelry.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/search" className="btn-white">Shop Lab-Grown Diamonds</Link>
              <Link href="/category/rings" className="btn-ghost text-white border-white/50 hover:bg-white/10">
                Browse Categories
              </Link>
            </div>
          </LuxuryReveal>
        </div>
      </section>
    </div>
  )
}