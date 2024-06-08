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
        
        const packetSize = packet.pcap_header?.caplen;
        packetSizeDistribution[packetSize] = (packetSizeDistribution[packetSize] || 0) + 1;


        setInterval(() => {
            console.log('-- Metrics Summary --');
            console.log(`Total Packets: ${packetCount}`);
            console.log('Protocol Distribution:');
            console.log(protocolDistribution);
            console.log('Packet Size Distribution:');
            console.log(packetSizeDistribution);
        }, 60000); 

    });
};
