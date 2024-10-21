import { Tab } from "@/components";

import GlobalStyles from "@/styles/GlobalStyles";
import "@/styles/tailwind.css";

describe("Tab.cy.tsx", () => {
  it("playground", () => {
    cy.mount(
      <>
        <Tab
          tabContents={["1", "2", "3"]}
          tabClickHandler={() => null}
          focusedTab={0}
        />
      </>,
    );
 
    cy.getDataTest("tabs").within(() => {
      cy.get("li").should("have.length", 3);
    });
  });
});
