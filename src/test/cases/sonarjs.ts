export function duplicated(input: string) {
  if (input === 'a') {
    return 1;
  } else if (input === 'b') {
    return 1;
  }

  return 0;
}

export function nested(value: number) {
  if (value > 0) {
    if (value > 10) {
      if (value > 100) {
        if (value > 1000) {
          if (value > 10000) {
            return 'very large';
          }
        }
      }
    }
  }

  return 'small';
}

export function collapsible(x: number) {
  if (x > 0) {
    if (x < 10) {
      return x;
    }
  }

  return 0;
}
