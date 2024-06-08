import pcap from 'pcap';


export const pcapSesh = () =>{

const pcapSession = pcap.createSession('en0'); 

pcapSession.on('packet', (rawPacket: Buffer) => {
    const packet = pcap.decode.packet(rawPacket);
    console.log(packet);
});



}
