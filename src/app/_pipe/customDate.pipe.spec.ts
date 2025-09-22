import { CustomDate } from "./customDate.pipe"; // Import the pipe
import moment from "moment"; // Import moment.js

describe("CustomDatePipe", () => {
  let pipe: CustomDate;

  beforeEach(() => {
    pipe = new CustomDate(); // Initialize the pipe
  });

  it("should create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should return the formatted date when valid date is provided", () => {
    const date = "2024-10-25";
    const format = "DD/MM/YYYY";
    const result = pipe.transform(date, format);

    expect(result).toBe(moment(date).format(format));
  });

  it('should return an empty string for invalid dates like "0000-00-00"', () => {
    const date = "0000-00-00";
    const format = "YYYY-MM-DD";
    const result = pipe.transform(date, format);

    expect(result).toBe("");
  });

  it('should return an empty string for invalid date-time like "0000-00-00 00:00:00"', () => {
    const date = "0000-00-00 00:00:00";
    const format = "YYYY-MM-DD HH:mm:ss";
    const result = pipe.transform(date, format);

    expect(result).toBe("");
  });

  it("should return the original value when the date is null or undefined", () => {
    const format = "DD/MM/YYYY";
    const resultForNull = pipe.transform(null, format);
    const resultForUndefined = pipe.transform(undefined, format);

    expect(resultForNull).toBe(null);
    expect(resultForUndefined).toBe(undefined);
  });

  it("should return the original date if no format is provided", () => {
    const date = "2024-10-25";
    const result = pipe.transform(date, null);

    expect(result).toBe(moment(date).format());
  });
});
