export type PasswordRequirement = {
  label: string;
  met: boolean;
};

export type PasswordStrength = "weak" | "fair" | "strong" | "very-strong";

/**
 * ASCII printable special characters (mirrors Python's string.punctuation and
 * the backend StrongPasswordValidator character set).
 */
const SPECIAL_CHAR_PATTERN = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

/**
 * Evaluates each industry-standard password requirement against the given password.
 * Requirements mirror the backend StrongPasswordValidator plus minimum length.
 */
export function getPasswordRequirements(
  password: string,
): PasswordRequirement[] {
  return [
    {
      label: "At least 12 characters",
      met: password.length >= 12,
    },
    {
      label: "At least one uppercase letter (A-Z)",
      met: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter (a-z)",
      met: /[a-z]/.test(password),
    },
    {
      label: "At least one digit (0-9)",
      met: /\d/.test(password),
    },
    {
      label: "At least one special character (!@#$%…)",
      met: SPECIAL_CHAR_PATTERN.test(password),
    },
  ];
}

/**
 * Returns a password strength rating based on how many requirements are met.
 */
export function getPasswordStrength(password: string): PasswordStrength {
  if (password.length === 0) return "weak";
  const metCount = getPasswordRequirements(password).filter(
    (r) => r.met,
  ).length;
  if (metCount <= 2) return "weak";
  if (metCount === 3) return "fair";
  if (metCount === 4) return "strong";
  return "very-strong";
}

/**
 * Returns true when all requirements are met.
 */
export function isPasswordValid(password: string): boolean {
  return getPasswordRequirements(password).every((r) => r.met);
}
