import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";

const destroyed$ = getDestroyed();

resetStreams();

export function getDestroyed(): Subject<void> {
  const global = window as any;
  return global.destroyed$ || (global.destroyed$ = new Subject());
}

export function resetStreams() {
  getDestroyed().next();
}

export function subscribe<T>(
  observable: Observable<T>,
  subscriber: (value: T) => void
) {
  observable.pipe(takeUntil(destroyed$)).subscribe(subscriber);
}
