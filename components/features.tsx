'use client';

import {
  Activity,
  Calendar,
  Clock,
  LineChart,
  Settings,
  Smartphone,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const features = [
  {
    name: 'AI-Powered Customization',
    description:
      'Get workout plans tailored specifically to your goals, fitness level, and preferences using advanced AI technology.',
    icon: Settings,
  },
  {
    name: 'Progress Tracking',
    description:
      'Monitor your fitness journey with detailed progress tracking and performance metrics.',
    icon: LineChart,
  },
  {
    name: 'Flexible Scheduling',
    description:
      'Choose workout times that fit your lifestyle with our adaptive scheduling system.',
    icon: Calendar,
  },
  {
    name: 'Real-time Adjustments',
    description:
      'Your plan evolves with you, automatically adjusting based on your progress and feedback.',
    icon: Activity,
  },
  {
    name: 'Time-Efficient Workouts',
    description:
      'Optimize your training time with scientifically designed workout routines.',
    icon: Clock,
  },
  {
    name: 'Mobile Friendly',
    description:
      'Access your workout plan anywhere, anytime with our responsive mobile design.',
    icon: Smartphone,
  },
];

export function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const featureElements = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      featureElements.current.forEach((feature, index) => {
        gsap.from(feature, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: feature,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.2,
        });
      });

      gsap.from('.features-title', {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: '.features-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.features-description', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: '.features-description',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, featuresRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={featuresRef} className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary features-title">
            Train Smarter
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl features-title">
            Everything you need for your fitness journey
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground features-description">
            Our AI-powered platform provides you with all the tools and guidance you need
            to achieve your fitness goals effectively and efficiently.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                ref={(el) => (featureElements.current[index] = el)}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}