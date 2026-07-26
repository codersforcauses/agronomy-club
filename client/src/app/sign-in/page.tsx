import Link from "next/link";

export const metadata = {
  title: "Sign In | Agronomy Club",
  description: "Access your Agronomy Club member account.",
};

export default function SignInPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <p className="text-sm/5 font-semibold uppercase tracking-widest text-brand-green">
          MEMBER ACCESS
        </p>
        <h1 className="mt-2 text-3xl/9 font-bold text-brand-text-dark sm:text-4xl/10">
          Welcome Back
        </h1>
        <div className="mt-6 w-full max-w-lg rounded-xl bg-white p-6 py-8 shadow-md shadow-brand-shadow sm:px-12 sm:py-8">
          <form>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-base/5 font-medium text-brand-text-dark"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email Address"
                  className="mt-1 block w-full rounded-lg border border-brand-green-light px-4 py-3 text-sm text-brand-text-dark placeholder:text-brand-brown/80 focus:border-brand-green focus:outline-none focus:ring-brand-green"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-base/5 font-medium text-brand-text-dark"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="mt-1 block w-full rounded-lg border border-brand-green-light px-4 py-3 text-sm text-brand-text-dark placeholder:text-brand-brown/80 focus:border-brand-green focus:outline-none focus:ring-brand-green"
                />
              </div>
            </div>
            <div className="mt-4 text-right text-sm text-brand-text-dark">
              <Link
                href="/reset-password"
                className="font-medium text-brand-green underline hover:text-brand-green-dark"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full rounded-lg bg-brand-green px-4 py-3 text-base font-medium text-brand-surface hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
              >
                Login
              </button>
            </div>
            <p className="text-brand-text-brown mt-4 text-center text-sm">
              Don't have an account yet?{" "}
              <Link
                href="/signup"
                className="font-medium text-brand-green underline hover:text-brand-green-dark"
              >
                Create one now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
