import raw from 'raw-socket';
import pcap from 'pcap'; 


const socket = raw.createSocket({ protocol: raw.Protocol.ICMP });


