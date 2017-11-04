import getDecorators from "inversify-inject-decorators";
import {Container, injectable} from "inversify";
import "reflect-metadata";

export const container = new Container();
const {lazyInject} = getDecorators(container);

export const Injectable = (target: any) => {
  container.bind(target).to(target).inSingletonScope();
  return injectable()(target);
};

export function Inject(target: object, propertyKey: string | symbol);
export function Inject(identifier: any);
export function Inject(...args: any[]) {
  if (args.length > 1) {
    const [target, propertyKey] = args;
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    return lazyInject(type)(target, propertyKey);
  }
  return lazyInject(args[0]);
}
