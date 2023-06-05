function abc(a: number, b = (z: number): number => a + 1): number {
  return b(a);
}
