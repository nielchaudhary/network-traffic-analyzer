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
