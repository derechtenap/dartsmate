type Props = {
  activeSteps: number[];
  steps: string[];
};

const StepProgress = ({ activeSteps, steps }: Props) => {
  return (
    <ul className="steps">
      {steps.map((step, _idx) => (
        <li
          className={`step ${
            activeSteps.includes(_idx + 1) ? "step-primary" : ""
          }`}
          key={_idx}
        >
          {step}
        </li>
      ))}
    </ul>
  );
};

export default StepProgress;
