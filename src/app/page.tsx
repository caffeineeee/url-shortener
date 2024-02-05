import { SignIn, SignOut } from "@/components/home/buttons";
import { Form } from "@/components/home/forms";
import { type Session, getServerSession } from "next-auth";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex flex-col items-center">
				<FormSection />
			</div>
		</main>
	);
}

async function FormSection() {
	// const session = (await getServerSession()) as Session;

	return (
		<>
			<div className="py-4">
				<Form />
			</div>
		</>
	);
}
