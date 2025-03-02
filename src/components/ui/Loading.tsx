import { Spinner } from "../assets/spinner";
export function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <Spinner />
    </div>
  );
}