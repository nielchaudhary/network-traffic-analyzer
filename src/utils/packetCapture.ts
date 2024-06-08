import pcap from 'pcap';

export const pcapSesh = () => {
    const pcapSession = pcap.createSession('en0');
    let packetCount = 0;
    let protocolDistribution: { [key: string]: number } = {};
    let packetSizeDistribution: { [key: string]: number } = {};

    pcapSession.on('packet', (rawPacket: Buffer) => {
        packetCount++;

        const packet = pcap.decode.packet(rawPacket);

        const protocol = packet.payload?.payload?.protocol;
        protocolDistribution[protocol] = (protocolDistribution[protocol] || 0) + 1;

    });
};
