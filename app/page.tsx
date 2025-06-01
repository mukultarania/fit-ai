"use client";

import { useState } from "react";
import { LandingHero } from "@/components/landing-hero";
import { Features } from "@/components/features";
import { CreatePlan } from "@/components/create-plan";
import { About } from "@/components/about";
import { Navbar } from "@/components/navbar";
import { ResearchSection } from "@/components/research-section";
import { WorkoutSplits } from "@/components/workout-splits";
import DietPlan from "./diet/page";
import Donate from "./donate/page";

export default function Home() {
	const [currentPage, setCurrentPage] = useState<
		| "home"
		| "create-plan"
		| "about"
		| "research"
		| "splits"
		| "diet"
		| "donate"
	>("home");

	return (
		<div className="min-h-screen bg-background">
			<Navbar setCurrentPage={setCurrentPage} />
			<main className="pt-16">
				{currentPage === "home" && (
					<>
						<LandingHero setCurrentPage={setCurrentPage} />
						<Features />
					</>
				)}
				{currentPage === "create-plan" && <CreatePlan />}
				{currentPage === "about" && <About />}
				{currentPage === "research" && <ResearchSection />}
				{currentPage === "splits" && (
					<WorkoutSplits setCurrentPage={setCurrentPage} />
				)}
				{currentPage === "donate" && <Donate/>}
				{currentPage === "diet" && <DietPlan />}
			</main>
		</div>
	);
}
