'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Detail from '@/components/Detail';
import { cookingList, type Cooking } from '@/config/cooking';
const kbdStyle = cn('mx-0.5 rounded bg-zinc-600 px-1 py-px text-sm shadow-[0_1.5px_0] shadow-zinc-800');
export default function Page() {
  const [food, setFood] = useState<Cooking>();
  const [open, setOpen] = useState(false);
  const handleFoodClick = (food: Cooking) => {
    setFood(food);
    setOpen(true);
  };
  return (
    <div>
      <div className="mx-auto w-full px-4 pt-8 pb-16 md:max-w-2xl xl:max-w-6xl">
        <div className="fixed-bg"></div>
        <h1 className="mb-3 text-5xl font-bold">烹饪大全</h1>
        <div className="mb-10 flex items-center">
          支持
          <span className={kbdStyle}>Tab</span>
          选择，<span className={kbdStyle}>Esc</span>退出
        </div>
        <section className="grid grid-cols-4 gap-x-4 gap-y-2 rounded-lg bg-[#634931] p-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10">
          {cookingList.map((food) => (
            <button
              key={food.id}
              className="relative aspect-square rounded-md border-0 p-1 transition-colors outline-none hover:bg-[#503b27] focus-visible:bg-[#503b27]"
              onFocus={() => handleFoodClick(food)}
              onClick={() => handleFoodClick(food)}>
              <Image
                src={food.imgPath}
                alt={food.name}
                width={100}
                height={100}
                loading="eager"
                className="mx-auto size-full object-scale-down"
                style={food.style}
              />
              <p className="text-text mt-1 text-center text-sm">{food.cname}</p>
            </button>
          ))}
          <Detail open={open} {...food} onClose={() => setOpen(false)} />
        </section>
      </div>
      <footer className="bg-brand h-32 p-4">
        <div className="mx-auto flex w-full justify-center gap-4 md:max-w-2xl xl:max-w-6xl">
          <a
            href="https://github.com/CiroLee/dont-starve-cooking"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text text-sm">
            Github
          </a>
          <a
            href="https://dontstarve.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text text-sm">
            饥荒维基
          </a>
        </div>
      </footer>
    </div>
  );
}
