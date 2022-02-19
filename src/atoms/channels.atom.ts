import { IChannel } from "interface/channel.interface";
import { atom } from "recoil";

export const ChannelAtom = atom({
	key: "ChannelAtom",
	default: [] as IChannel[],
});
