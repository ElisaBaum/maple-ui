import getDecorators from "inversify-inject-decorators";
import {Container, injectable} from "inversify";
import "reflect-metadata";

export const container = new Container();
const {lazyInject} = getDecorators(container);

export const Injectable = (target: any) => {
  container.bind(target).to(target);
  return injectable()(target);
};

export const Inject = (target: any, propertyKey: string) => {
  return lazyInject(Reflect.getMetadata('design:type', target, propertyKey))(target, propertyKey);
};
