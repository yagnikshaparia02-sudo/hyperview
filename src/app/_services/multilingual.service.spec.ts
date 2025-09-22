import { TestBed, inject } from "@angular/core/testing";

import { MultilingualService } from "./multilingual.service";

describe("MultilingualService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultilingualService],
    });
  });

  it("should be created", inject(
    [MultilingualService],
    (service: MultilingualService) => {
      expect(service).toBeTruthy();
    }
  ));
});
