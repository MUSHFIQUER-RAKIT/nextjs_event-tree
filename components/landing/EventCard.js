import { getBlurData } from "@/utils/blur-genaretor";
import Image from "next/image";
import Link from "next/link";
import ActionButtons from "../ActionButtons";
import EventSchemaScript from "../meta/EventSchemaScript";

export default async function EventCard({ event }) {
  const { base64 } = await getBlurData(event?.imageUrl);
  return (
    <div className="overflow-hidden rounded-md bg-[#242526]">
      <EventSchemaScript event={event} />
      <div className="h-2/3">
        <Image
          src={event?.imageUrl}
          alt={event?.name}
          className="w-full object-fill h-full"
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={base64}
        />
      </div>

      <div className="h-1/3">
        <Link href={`/details/${event?.id}`} className="font-bold text-lg">
          {event?.name}
        </Link>
        <p className="text-[#9C9C9C] text-sm mt-1">{event?.location}</p>
        <div className="text-[#737373] text-sm mt-1">
          <span>{event?.interested_ids?.length}k Interested</span>
          <span className="mx-1">|</span>
          <span>{event?.going_ids?.length}K Going</span>
        </div>
        <ActionButtons
          eventId={event?.id}
          interested_ids={event?.interested_ids}
          going_ids={event?.going_ids}
        />
      </div>
    </div>
  );
}
