import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./layout/AppLayout";
import { BrandFoundation } from "./pages/BrandFoundation";
import { MoodboardSelection } from "./pages/MoodboardSelection";
import { AIDirections } from "./pages/AIDirections";
import { FinalOutput } from "./pages/FinalOutput";
import { LandingPage } from "./pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/build",
    Component: AppLayout,
    children: [
      { index: true, Component: BrandFoundation },
      { path: "moodboard", Component: MoodboardSelection },
      { path: "directions", Component: AIDirections },
      { path: "final", Component: FinalOutput },
    ],
  },
]);
