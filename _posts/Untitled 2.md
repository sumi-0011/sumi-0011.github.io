package router;

import java.util.ArrayList;

public class RoutingTable {
	public ArrayList<routeEntry> entry;

	// - routeEntry
	// Element objects in the routing table.
	public class routeEntry {
		byte[] dst;
		byte[] netMask;
		byte[] gateway;
		String flag;
		byte[] routeInterface;
		int metric;
	
		public routeEntry() {
			this.dst = new byte[4];
			this.netMask = new byte[4];
			this.gateway = new byte[4];
			this.flag = null;
			this.routeInterface = new byte[4];
			this.metric = 0;
		}
	}
	
	// - RoutingTable
	// Constructor.
	public RoutingTable() {
		initRoutingTable();
	}
	
	// - initRoutingTable
	// Initialize the routing table.
	private void initRoutingTable() {
		entry = new ArrayList<>();
	}
	
	// - addEntry
	// Add elements to routing table.
	public boolean addEntry(byte[] dst, byte[] netMask, byte[] gateway, String flag, byte[] routeInterface) {
		routeEntry newEntry = new routeEntry();
		newEntry.dst = dst;
		newEntry.netMask = netMask;
		newEntry.gateway = gateway;
		newEntry.flag = flag;
		newEntry.routeInterface = routeInterface;
	
		entry.add(newEntry);
		return true;
	}
	
	// - removeAll
	// Clear all routing table elements.
	public boolean removeAll() {
		entry.clear();
		return true;
	}
	
	// - getMaskLength
	// Return the length of net mask
	private int getMaskLength(byte[] netMask) {
		int length = 0;
		boolean isZero = true;
		for (int i = 3; i >= 0; i--) {
			byte cmp = (byte) (0x01);
			byte tmp = netMask[i];
			for (int j = 0; j < 8; j++) {
				// compare byte by bit
				byte result = (byte) (cmp & (tmp >> j));
				if (result == (byte) (1)) {
					isZero = false;
					break;
				}
				length++;
			}
			if (!isZero) {
				break;
			}
		}
		return (32 - length);
	}
	
	// - findInterface
	// Return the port to use when sending packets
	public byte[] findInterface(byte[] dstIP) {
		byte[] find = null;
		int maskLength = 0;
		for (int i = 0; i < entry.size(); i++) {
	
			routeEntry tmp = entry.get(i);
			boolean check = masking(tmp, dstIP);
	
			if (check) {
				// matched
				if (tmp.flag.contains("H")) {
					// direct connection with the host
					int getLength = getMaskLength(tmp.netMask);
					if (maskLength < getLength) {
						// select interface for longest matched destination.
						find = tmp.routeInterface;
						maskLength = getLength;
					}
				}
			}
		}
		return find;
	}
	
	// - masking
	// Return the result of masking of subnet masks and IP addresses.
	private boolean masking(routeEntry entry, byte[] dstIP) {
		boolean check = true;
		for (int j = 0; j < 4; j++) {
			if (entry.dst[j] != (dstIP[j] & entry.netMask[j])) {
				check = false;
			}
		}
		return check;
	}
}