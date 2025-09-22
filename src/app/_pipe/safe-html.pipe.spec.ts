import { SafeHtml } from "./safe-html.pipe";
import {
  DomSanitizer,
  SafeHtml as SafeHtmlType,
} from "@angular/platform-browser";
import { TestBed } from "@angular/core/testing";

describe("SafeHtmlPipe", () => {
  let pipe: SafeHtml;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomSanitizer], // Provide DomSanitizer dependency
    });

    sanitizer = TestBed.inject(DomSanitizer); // Inject DomSanitizer
    pipe = new SafeHtml(sanitizer); // Initialize the pipe with DomSanitizer
  });

  it("should create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  // it('should sanitize and return safe HTML content', () => {
  //   const htmlString = '<div>Test HTML</div>';
  //   const sanitizedContent = pipe.transform(htmlString) as SafeHtmlType;

  //   expect(sanitizedContent).toBeTruthy();
  //   expect(sanitizer.bypassSecurityTrustHtml(htmlString)).toEqual(sanitizedContent);
  // });

  // it('should return null for null or undefined input', () => {
  //   const result = pipe.transform(null);
  //   expect(result).toBe(null);

  //   const undefinedResult = pipe.transform(undefined);
  //   expect(undefinedResult).toBe(null);
  // });

  // it('should return sanitized HTML for empty string input', () => {
  //   const result = pipe.transform('');
  //   expect(result).toBeTruthy();
  //   expect(sanitizer.bypassSecurityTrustHtml('')).toEqual(result);
  // });
});
