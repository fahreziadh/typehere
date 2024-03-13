import type { HTMLButtonAttributes } from "svelte/elements";
import Root from "./button.svelte";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
	base: "inline-flex items-center justify-center rounded-full text-sm font-medium active:scale-95 whitespace-nowrap ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			default: "bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background",
			destructive: "bg-red-500/20 text-red-500 border border-red-500/20 hover:opacity-50",
			outline:
				"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground border hover:opacity-80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
		},
		size: {
			default: "h-8 px-3 py-2",
			sm: "h-7 px-1 text-xs",
			lg: "h-11 px-8",
			icon: "h-8 w-8",
			"icon-lg": "h-11 w-11",
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

type Events = HTMLButtonElement;

export {
	Root,
	type Props,
	type Events,
	//
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
	buttonVariants,
};