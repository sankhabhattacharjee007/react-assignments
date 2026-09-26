// Password Strength Evaluator
export const evaluatePasswordStrength = (password = '') => {
  if (!password) {
    return {
      score: 0,
      percent: 0,
      label: 'None',
      color: '#52525b'
    };
  }

  let points = 0;
  if (password.length >= 6) points += 1;
  if (password.length >= 8) points += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) points += 1;
  if (/[0-9]/.test(password)) points += 1;
  if (/[^A-Za-z0-9]/.test(password)) points += 1;

  if (points <= 2) {
    return {
      score: 1,
      percent: 33,
      label: 'Weak',
      color: '#e11d48' // Crimson Red
    };
  } else if (points <= 3) {
    return {
      score: 2,
      percent: 66,
      label: 'Medium',
      color: '#f59e0b' // Amber
    };
  } else {
    return {
      score: 3,
      percent: 100,
      label: 'Strong',
      color: '#22c55e' // Green
    };
  }
};
