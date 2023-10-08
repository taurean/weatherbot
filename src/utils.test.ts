import { expect, test } from "vitest";
import { cToF } from "./utils";

// Test values from NASA Armstrong Flight Research Center - https://weather.dfrc.nasa.gov/data/ctof.pdf
test("freezing temperature from celsius to fahrenheit, rounded", () => {
  expect(cToF(0)).toBe(32);
});

test("A positive whole number value, rounded", () => {
  expect(cToF(10)).toBe(50);
});

test("A positive decimal value, rounded", () => {
  expect(cToF(10.5)).toBe(51);
});

test("A negative whole number value, rounded", () => {
  expect(cToF(-10)).toBe(14);
});

test("A negative decimal value, rounded", () => {
  expect(cToF(-10.5)).toBe(13);
});

// https://weather.dfrc.nasa.gov/Conversions
test("A negative decimal value that converts to a negative Fº value, rounded", () => {
  expect(cToF(-20.25)).toBe(-4);
});
