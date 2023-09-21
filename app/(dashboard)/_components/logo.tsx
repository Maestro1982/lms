import Image from 'next/image';

export const Logo = () => {
  return (
    <div className='flex items-center'>
      <Image height={50} width={50} alt='logo' src='/logo.svg' />
      <p className='ml-2 text-lg text-[#007dfc] font-bold'>LMS</p>
    </div>
  );
};
