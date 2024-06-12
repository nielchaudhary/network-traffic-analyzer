import pcap from 'pcap';

interface Device {
    macAddress: string;
    ipAddresses: Set<string>;
    traffic: number;
}

const deviceInventory: Device[] = [];

export const createPcapSession = () => {
    const pcapSession = pcap.createSession('en0');

    pcapSession.on('packet', (rawPacket) => {
        const packet = pcap.decode.packet(rawPacket);
        const ethernet = packet.payload;
        const ip = ethernet.payload;

        const srcMac = ethernet.shost.addr.join(':');
        const dstMac = ethernet.dhost.addr.join(':');

        const srcIp = ip.saddr.addr.join('.');
        const dstIp = ip.daddr.addr.join('.');

        // Update device inventory
        updateDeviceInventory(srcMac, srcIp, rawPacket.buf.length);
        updateDeviceInventory(dstMac, dstIp, rawPacket.buf.length);
    });
};

const updateDeviceInventory = (macAddress: string, ipAddress: string, packetSize: number) => {
    let device = deviceInventory.find(dev => dev.macAddress === macAddress);

    if (!device) {
        device = {
            macAddress,
            ipAddresses: new Set<string>(),
            traffic: 0
        };
        deviceInventory.push(device);
    }

    device.ipAddresses.add(ipAddress);
    device.traffic += packetSize;
};

export const getDeviceInventory = () => {
    return deviceInventory.map(device => ({
        macAddress: device.macAddress,
        ipAddresses: Array.from(device.ipAddresses),
        traffic: device.traffic
    }));
};


//Reasons for Storing Addresses : 
// MAC Addresses: These are used to uniquely identify devices. Unlike IP addresses, which can change, MAC addresses are generally fixed and unique to each device's network interface.
// IP Addresses: Storing IP addresses helps track the network activity of each device, as devices might obtain different IP addresses over time due to DHCP or network changes. Knowing the IP addresses associated with each MAC address can be useful for network analysis and troubleshooting.
// Traffic: Monitoring the amount of data sent and received by each device helps in understanding the network load and identifying devices that are consuming excessive bandwidth.