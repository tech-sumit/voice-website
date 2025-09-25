import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers - VoiceAI",
  description: "Join our team and help shape the future of AI voice technology. Explore career opportunities at VoiceAI.",
};

export default function CareersPage() {
  const positions = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote / Pune, India",
      type: "Full-time",
      description: "Lead the development of our next-generation voice AI models and conversational systems.",
      requirements: [
        "5+ years experience in AI/ML engineering",
        "Expertise in NLP and speech processing",
        "Experience with transformer architectures",
        "Strong Python and PyTorch skills"
      ]
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote / Pune, India",
      type: "Full-time",
      description: "Drive product strategy and roadmap for our voice AI platform.",
      requirements: [
        "3+ years product management experience",
        "Experience with AI/ML products",
        "Strong analytical and communication skills",
        "B2B SaaS experience preferred"
      ]
    },
    {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote / Pune, India",
      type: "Full-time",
      description: "Build beautiful, responsive user interfaces for our voice AI platform.",
      requirements: [
        "3+ years frontend development experience",
        "Expertise in React, TypeScript, and Next.js",
        "Experience with Tailwind CSS",
        "Strong UI/UX sensibilities"
      ]
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / Pune, India",
      type: "Full-time",
      description: "Help our customers achieve success with our voice AI solutions.",
      requirements: [
        "2+ years customer success experience",
        "Strong technical communication skills",
        "Experience with enterprise software",
        "AI/ML knowledge preferred"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-accent-50 dark:bg-surface-800">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-accent-100 to-accent-50 dark:from-surface-800 dark:to-surface-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-bright-500 dark:text-accent-100 mb-6">
              Join Our <span className="text-primary-500 dark:text-primary-400">Team</span>
            </h1>
            <p className="text-xl text-bright-600 dark:text-accent-300 mb-8 leading-relaxed">
              Help us build the future of AI voice technology. We&apos;re looking for passionate individuals 
              who want to make a real impact in the world of conversational AI.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-500 dark:text-neutral-500">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full">Remote-first</span>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full">Competitive salary</span>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full">Equity options</span>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full">Health benefits</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              Why Join VoiceAI?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              We&apos;re building something revolutionary, and we need talented people to help us get there.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-surface-0 dark:bg-surface-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                Cutting-Edge Technology
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Work with the latest AI models and voice technologies that are shaping the future.
              </p>
            </div>

            <div className="p-6 bg-surface-0 dark:bg-surface-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                Global Impact
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Help businesses worldwide communicate better with AI-powered voice solutions.
              </p>
            </div>

            <div className="p-6 bg-surface-0 dark:bg-surface-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                Innovation Culture
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Be part of a team that encourages creativity, experimentation, and bold ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 bg-surface-0 dark:bg-surface-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Find your next opportunity with us
            </p>
          </div>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <div key={index} className="p-6 bg-accent-50 dark:bg-surface-700 rounded-xl border border-neutral-200 dark:border-neutral-600 hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium">
                    Apply Now
                  </button>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {position.description}
                </p>
                <div>
                  <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                    {position.requirements.map((req, reqIndex) => (
                      <li key={reqIndex}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Don&apos;t See Your Role?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals. Send us your resume and tell us how you&apos;d like to contribute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@voiceai.com"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200 font-medium"
            >
              Send Resume
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
