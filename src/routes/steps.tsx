import { createFileRoute } from "@tanstack/react-router";

const LAST_STEP = 3;

export const Route = createFileRoute("/steps")({
  component: RouteComponent,
  validateSearch: (search) => {
    const step = Number(search.step);

    return {
      username: search.username ? String(search.username) : "Guest",
      step: isNaN(step) ? undefined : Math.max(Math.min(LAST_STEP, step), 0),
    };
  },
});

function RouteComponent() {
  const { step = 0, username } = Route.useSearch();
  const navigate = Route.useNavigate();

  const move = (step: number) =>
    navigate({
      search: (prev) => ({ ...prev, step }),
      // Imperative declaration here. Needs to be set on all navigations to this page.
      // Better using the declarative approach in the route definition (look for createRouteMask in App.tsx)
      // mask: { search: (prev) => ({ ...prev, step: undefined }) },
    });
  const prev = () => move(step - 1);
  const next = () => move(step + 1);

  return (
    <div>
      <h2>Steps</h2>
      <span>
        Hello <b>{username}</b>. This is a multi-step process. You are currently
        on step <b>{step}</b>.
      </span>
      <div>-----------------------------</div>
      <div>
        {step === 0 && <Step0 />}
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </div>
      <div>-----------------------------</div>
      <div>
        <button disabled={step <= 0} onClick={prev}>
          Prev
        </button>
        <button disabled={step >= LAST_STEP} onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
}

const Step0 = () => {
  return (
    <div>
      <h3>Step 0</h3>
      Some data is shown here
    </div>
  );
};

const Step1 = () => {
  return (
    <div>
      <h3>Step 1</h3>
      Some more there
    </div>
  );
};

const Step2 = () => {
  return (
    <div>
      <h3>Step 2</h3>
      Almost there
    </div>
  );
};

const Step3 = () => {
  return (
    <div>
      <h3>Step 3</h3>
      Done!
    </div>
  );
};
