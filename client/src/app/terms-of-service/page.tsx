export const metadata = {
  title: "Terms of Service | Agronomy Club",
  description: "Terms governing access to and use of the Agronomy Club website",
};

export default function TermsOfServicePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-1 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-brand-text-dark sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mb-10 text-sm text-brand-text">
          <strong>Last updated:</strong> 27 July 2026
        </p>
      </header>

      <section className="space-y-10 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="mb-3 text-2xl font-semibold">1. Introduction</h2>
          <p>
            These Terms of Service ("Terms") govern access to and use of the
            Agronomy Club website ("the website").
          </p>
          <p className="mt-3">
            The website provides a platform for agronomy-related student
            organisations and communities to share information, educational
            resources, events, and networking opportunities.
          </p>
          <p className="mt-3">
            By accessing or using this website, you agree to comply with these
            Terms.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            2. Purpose of the Website
          </h2>
          <p>The website is designed to support:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Collaboration between agronomy organisations: Chapters</li>
            <li>Sharing of educational materials</li>
            <li>Promotion of agronomy-related events</li>
            <li>Community engagement and professional development</li>
          </ul>
          <p className="mt-3">
            The website is provided for educational and community purposes.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">3. Acceptable Use</h2>
          <p>Users must use the website responsibly and must not:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Access areas of the website without authorisation</li>
            <li>Attempt to bypass security controls or permissions</li>
            <li>Upload harmful, malicious, or unlawful content</li>
            <li>
              Upload content that infringes another person's intellectual
              property rights
            </li>
            <li>Provide misleading or inaccurate information</li>
            <li>Use the website to harass, threaten, or harm others</li>
            <li>Interfere with the operation or security of the website</li>
          </ul>
          <p className="mt-3">
            We reserve the right to remove content or restrict access where
            these Terms are breached.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            4. User Accounts and Responsibilities
          </h2>
          <p>Users with accounts must:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Provide accurate information where required</li>
            <li>Maintain the confidentiality of login details</li>
            <li>Only use accounts assigned to them</li>
            <li>
              Ensure activities performed under their account comply with these
              Terms
            </li>
          </ul>
          <p className="mt-3">
            Users are responsible for all activity performed using their
            account.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            5. Roles and Permissions
          </h2>
          <p>
            The website uses role-based access control to manage user
            permissions.
          </p>
          <p className="mt-3">Different roles may include:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Super Administrator</li>
            <li>Chapter Owner</li>
            <li>Chapter Administrator</li>
            <li>Chapter Member</li>
            <li>User</li>
          </ul>
          <p className="mt-3">
            Users must only perform actions permitted by their assigned role.
          </p>
          <p className="mt-3">
            Administrators may change or remove permissions where:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>A user's role changes</li>
            <li>A user is no longer associated with a chapter</li>
            <li>Access is required to maintain website security</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            6. Chapter Responsibilities
          </h2>
          <p>
            Chapter Owners and Chapter Administrators are responsible for
            ensuring that chapter content is:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Accurate</li>
            <li>Current</li>
            <li>Appropriate for public display</li>
            <li>Submitted with appropriate authority</li>
          </ul>
          <p className="mt-3">This includes:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Chapter information</li>
            <li>Events</li>
            <li>Educational resources</li>
            <li>Quizzes</li>
            <li>Contact information</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            7. User-Submitted Content
          </h2>
          <p>
            Users who upload content remain responsible for ensuring they have
            the appropriate rights and permissions.
          </p>
          <p className="mt-3">By submitting content, users confirm that:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>They have permission to share the content</li>
            <li>The content does not breach applicable laws</li>
            <li>The content does not infringe third-party rights</li>
          </ul>
          <p className="mt-3">
            Users retain ownership of their submitted content.
          </p>
          <p className="mt-3">
            By uploading content, users grant the Agronomy Club permission to
            store, display, and use that content for operating and promoting the
            website.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            8. Intellectual Property
          </h2>
          <p>
            Content created by the Agronomy Club, including branding, logos, and
            website design elements, remains the property of its respective
            owners.
          </p>
          <p className="mt-3">
            Third-party content remains owned by the relevant copyright holders.
          </p>
          <p className="mt-3">
            Users must not reproduce, distribute, or modify content without
            appropriate permission.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            9. External Websites and Services
          </h2>
          <p>
            The website may contain links to external websites and platforms.
          </p>
          <p className="mt-3">
            These links are provided for convenience and educational purposes.
          </p>
          <p className="mt-3">
            The Agronomy Club does not control external websites and is not
            responsible for:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Their availability</li>
            <li>Accuracy of information</li>
            <li>Privacy practices</li>
            <li>Security practices</li>
          </ul>
          <p className="mt-3">
            Users access external services at their own discretion.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            10. Website Availability
          </h2>
          <p>
            We aim to maintain a reliable website but do not guarantee that the
            website will always be available, uninterrupted, or free from
            errors.
          </p>
          <p className="mt-3">
            The website may be updated, modified, or temporarily unavailable due
            to maintenance or technical requirements.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">11. Disclaimer</h2>
          <p>
            Information provided through the website is intended for educational
            and community purposes.
          </p>
          <p className="mt-3">
            While reasonable efforts are made to maintain accurate information,
            the Agronomy Club does not guarantee that all content is complete,
            accurate, or current.
          </p>
          <p className="mt-3">
            Users should independently verify information where necessary.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            12. Limitation of Liability
          </h2>
          <p>
            To the extent permitted by Australian law, the Agronomy Club is not
            responsible for losses or damages arising from:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Reliance on website information</li>
            <li>Use of external websites</li>
            <li>User-submitted content</li>
            <li>Temporary website interruptions</li>
          </ul>
          <p className="mt-3">
            Nothing in these Terms excludes rights or remedies that cannot
            legally be excluded under Australian law.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">
            13. Changes to These Terms
          </h2>
          <p>We may update these Terms from time to time.</p>
          <p className="mt-3">
            Updated Terms will be published on this website. Continued use of
            the website after changes are published indicates acceptance of the
            updated Terms.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">14. Contact</h2>
          <p>
            Questions regarding these Terms of Service may be directed to the
            Agronomy Club website administrators.
          </p>
        </div>
      </section>
    </section>
  );
}
