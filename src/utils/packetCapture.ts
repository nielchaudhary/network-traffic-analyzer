import pcap from 'pcap';

interface ProtocolDistribution {
    [key: string]: number;
}

interface PacketSizeDistribution {
    [key: number]: number;
}

export const createPcapSession = () => {
    const pcapSession = pcap.createSession('en0');
    let packetCount = 0;
    let protocolDistribution: ProtocolDistribution = {};
    let packetSizeDistribution: PacketSizeDistribution = {};

    pcapSession.on('packet', (rawPacket: Buffer) => {
        packetCount++;

        const packet = pcap.decode.packet(rawPacket);
        const ethernetPacket = packet.payload;
        const ipPacket = ethernetPacket?.payload;
        const tcpPacket = ipPacket.payload;

        const srcIP = ipPacket.saddr.addr.join('.');
       const  dstIP = ipPacket.daddr.addr.join('.');
       const srcPort = tcpPacket.sport;
       const dstPort = tcpPacket.dport;



        const protocol = ipPacket?.protocol || 'unknown';
        const packetSize = packet.pcap_header?.caplen || 0;

        protocolDistribution[protocol] = (protocolDistribution[protocol] || 0) + 1;
        packetSizeDistribution[packetSize] = (packetSizeDistribution[packetSize] || 0) + 1;

        console.log({
            ipPacket,
            srcIP : srcIP,
            dstIP : dstIP,
            srcPort : srcPort,
            dstPort : dstPort
            
        })
    });

  

};
