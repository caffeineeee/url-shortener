import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input type="url" placeholder="https://..." />
				<Button type="submit">Shorten Link</Button>
			</div>
		</main>
	);
}
