import { CookieComponent } from "./_CookieComponent";

describe("CookieComponent", () => {
  beforeEach(() => {
    // Clear all cookies before each test to ensure a fresh start.
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  });

  it("should set a cookie", () => {
    CookieComponent.set("testCookie", "testValue", { path: "/" });
    const cookieValue = CookieComponent.get("testCookie");
    expect(cookieValue).toBe("testValue");
  });

  it("should get a cookie", () => {
    document.cookie = "anotherCookie=anotherValue";
    const cookieValue = CookieComponent.get("anotherCookie");
    expect(cookieValue).toBe("anotherValue");
  });

  it("should delete a cookie", () => {
    CookieComponent.set("tempCookie", "tempValue", { path: "/" });
    CookieComponent.delete("tempCookie");
    const cookieValue = CookieComponent.get("tempCookie");
    expect(cookieValue).toBeUndefined();
  });
});
