import type { HTMLButtonAttributes } from "svelte/elements";
import Root from "./button.svelte";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
	base: "inline-flex items-center justify-center rounded-full text-sm font-medium active:scale-95 whitespace-nowrap ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			default: "bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background",
			solid: "bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground",
			destructive: "bg-red-500/20 text-red-500 border border-red-500/20 hover:opacity-50",
			success: "bg-green-500/20 text-green-500 border border-green-500/20 hover:opacity-50",
			outline:
				"border border-input bg-background hover:bg-foreground hover:text-background",
			secondary: "bg-secondary text-secondary-foreground border hover:opacity-80",
			ghost: "hover:bg-secondary hover:text-accent-foreground",
			link: "text-foreground underline-offset-4 hover:underline",
		},
		size: {
			default: "h-8 px-3 py-2",
			sm: "h-7 px-2 text-xs",
			lg: "h-9 lg:h-11 px-6 lg:px-8 text-base font-semibold",
			icon: "h-8 w-8",
			"icon-lg": "h-9 w-9 lg:h-11 lg:w-11",
			"icon-sm": "h-7 w-7 text-xs",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

type Variant = VariantProps<typeof buttonVariants>["variant"];
type Size = VariantProps<typeof buttonVariants>["size"];

type Props = HTMLButtonAttributes & {
	variant?: Variant;
	size?: Size;
};

type Events =  HTMLButtonElement;

export {
	Root,
	type Props,
	type Events,

	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
	buttonVariants,
};