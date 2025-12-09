'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import CopyButton from './CopyButton';
import Highlight from './Highlight';
import { XIcon } from '@/components/Icon';
import { type Cooking, FoodTypeEnum, FoodTemperatureEnum } from '@/config/cooking';
import { useEffect, useEffectEvent } from 'react';

const hhsItem = cn('flex items-center flex-col');
interface DialogProps extends Partial<Cooking> {
  open?: boolean;
  onClose: () => void;
}
export default function Detail({
  open,
  cname,
  name = '',
  imgPath = '',
  dimension,
  foodType,
  getWays,
  code,
  expired,
  waysQuery,
  temperatureType,
  description,
  onClose,
}: DialogProps) {
  const onCloseEvent = useEffectEvent(onClose);
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onCloseEvent();
      }
    }
    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open]);
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: -16 }}
          transition={{ duration: 0.2 }}
          exit={{ x: '100%' }}
          className={cn(
            'fixed top-4 right-0 z-999 h-fit w-80 rounded-md bg-[#291e15] p-4 shadow-[0_12px_16px_rgba(0,0,0,0.8)]',
          )}>
          <button
            className="absolute top-4 right-4 inline-flex size-7 items-center justify-center rounded transition-colors hover:bg-black/40"
            onClick={onClose}>
            <XIcon className="size-4" />
          </button>
          <div className="mb-2 text-center text-xl">{cname}</div>
          <p className="mt-1 mb-4 text-center text-sm">{name}</p>
          <Image src={imgPath} alt={name} width={100} height={100} className="mx-auto h-25 w-auto" />
          <div className="my-2 h-px bg-[#67482c]" />
          <div className="grid grid-cols-3 py-2">
            {dimension ? (
              <>
                <div className={hhsItem}>
                  <Image
                    src="/images/game/Hunger_Meter.webp"
                    alt="hunger meter"
                    width={100}
                    height={100}
                    className="size-14"
                  />
                  <p className="text-sm">{dimension[0]}</p>
                </div>
                <div className={hhsItem}>
                  <Image
                    src="/images/game/Health_Meter.webp"
                    alt="health meter"
                    width={100}
                    height={100}
                    className="size-14"
                  />
                  <p className="text-sm">{dimension[1]}</p>
                </div>
                <div className={hhsItem}>
                  <Image
                    src="/images/game/Sanity_Meter.webp"
                    alt="sanity meter"
                    width={100}
                    height={100}
                    className="size-14"
                  />
                  <p className="text-sm">{dimension[2]}</p>
                </div>
              </>
            ) : null}
          </div>
          {foodType !== undefined ? (
            <div className="mt-2 flex items-center text-sm">
              <span className="font-semibold">食物类型</span>：
              {Array.isArray(foodType) ? (
                <div className="space-x-1">
                  {foodType.map((item) => (
                    <span key={item} className="text-text">
                      {FoodTypeEnum.findBy('value', item)?.label}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-text">{FoodTypeEnum.findBy('value', foodType)?.label}</span>
              )}
            </div>
          ) : null}
          {temperatureType ? (
            <div className="mt-2 text-sm">
              <span className="font-semibold">食物温度</span>：
              <span className="text-text">{FoodTemperatureEnum.findBy('value', temperatureType)?.label}</span>
            </div>
          ) : null}
          {expired ? (
            <div className="mt-2 text-sm">
              <span className="font-semibold">保质期</span>：<span className="text-text">{expired}天</span>
            </div>
          ) : null}
          <div className="mt-2 py-2 text-sm">
            <span className="font-semibold">烹饪要求</span>：
            <Highlight query={waysQuery || ''}>{getWays || ''}</Highlight>
          </div>
          {description ? (
            <div className="mt-2 pb-2 text-sm">
              <p>{description}</p>
            </div>
          ) : null}
          <div className="my-2 h-px bg-[#67482c]" />
          <div className="flex items-center text-sm">
            <div className="flex-1">代码：{code}</div>
            <CopyButton text={code} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
