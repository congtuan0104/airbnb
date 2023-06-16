'use client';

import Image from 'next/image';

interface IAvatarProps {
	src: string | null | undefined;
}

const Avatar = ({ src }: IAvatarProps) => {
	return (
		<Image
			className="rounded-full border-[1px] border-gray-300"
			height={30}
			width={30}
			alt="avatar"
			src={src || '/images/placeholder.jpg'}
		/>
	);
};

export default Avatar;
