import { TestBed } from "@angular/core/testing";
import { PageInfoService, PageLink } from "./page-info.service";

describe("PageInfoService", () => {
  let service: PageInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageInfoService],
    });
    service = TestBed.inject(PageInfoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set and get title correctly", () => {
    service.setTitle("New Title");
    service.title.subscribe((title) => {
      expect(title).toBe("New Title");
    });
  });

  it("should update title correctly", (done) => {
    service.updateTitle("Updated Title");
    setTimeout(() => {
      service.title.subscribe((title) => {
        expect(title).toBe("Updated Title");
        done();
      });
    }, 5);
  });

  it("should set and get description correctly", () => {
    service.setDescription("New Description");
    service.description.subscribe((description) => {
      expect(description).toBe("New Description");
    });
  });

  it("should update description correctly", (done) => {
    service.updateDescription("Updated Description");
    setTimeout(() => {
      service.description.subscribe((description) => {
        expect(description).toBe("Updated Description");
        done();
      });
    }, 5);
  });

  it("should set and get breadcrumbs correctly", () => {
    const breadcrumbs: Array<PageLink> = [
      { title: "Home", path: "/", isActive: true },
      { title: "Dashboard", path: "/dashboard", isActive: false },
    ];
    service.setBreadcrumbs(breadcrumbs);
    service.breadcrumbs.subscribe((bc) => {
      expect(bc).toEqual(breadcrumbs);
    });
  });

  it("should update breadcrumbs correctly", (done) => {
    const initialBreadcrumbs: Array<PageLink> = [
      { title: "Home", path: "/", isActive: true },
    ];
    service.setBreadcrumbs(initialBreadcrumbs);

    const newBreadcrumbs: Array<PageLink> = [
      { title: "About", path: "/about", isActive: false },
    ];

    service.updateBreadcrumbs(newBreadcrumbs);
    setTimeout(() => {
      service.breadcrumbs.subscribe((bc) => {
        expect(bc).toEqual(newBreadcrumbs);
        done();
      });
    }, 25);
  });
});
