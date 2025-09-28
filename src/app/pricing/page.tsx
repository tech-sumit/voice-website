export default function PricingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-bright-900 dark:text-accent-100 mb-4">
          Pricing Coming Soon
        </h1>
        <p className="text-lg text-bright-600 dark:text-accent-300 mb-8">
          We&apos;re working on our pricing plans. Contact us for custom pricing.
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
} 