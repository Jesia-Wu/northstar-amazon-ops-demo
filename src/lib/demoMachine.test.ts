import { describe, expect, test } from 'vitest';
import { advanceDemoStep, createDemoSteps } from './demoMachine';

describe('demo step machine', () => {
  test('starts with exactly one active step', () => {
    const steps = createDemoSteps();

    expect(steps[0].status).toBe('active');
    expect(steps.slice(1).every((step) => step.status === 'pending')).toBe(true);
  });

  test('moves only the active step to complete and activates the next step', () => {
    const next = advanceDemoStep(createDemoSteps(), 'validate_input');

    expect(next[0].status).toBe('complete');
    expect(next[1].status).toBe('active');
    expect(next.slice(2).every((step) => step.status === 'pending')).toBe(true);
  });

  test('does not allow a pending step to skip ahead of the active step', () => {
    const initial = createDemoSteps();

    expect(advanceDemoStep(initial, 'prepare_assets')).toEqual(initial);
  });

  test('reaches a terminal all-complete state when each active step advances in order', () => {
    let steps = createDemoSteps();

    while (steps.some((step) => step.status === 'active')) {
      const activeStep = steps.find((step) => step.status === 'active');
      steps = advanceDemoStep(steps, activeStep!.id);
    }

    expect(steps.every((step) => step.status === 'complete')).toBe(true);
  });
});
