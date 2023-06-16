'use client';

export interface IMenuItemProps {
	label: string;
	onClick?: () => void;
}

export default function MenuItem({
	label,
	onClick = () => {},
}: IMenuItemProps) {
	return (
		<div
			onClick={onClick}
			className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
		>
			{label}
		</div>
	);
}
