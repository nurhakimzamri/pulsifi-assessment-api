export interface IRoundtripFlightResponse {
  id: string;
  type: string;
  content: {
    location: {
      id: string;
      skyCode: string;
      name: string;
      type: string;
    };
    flightQuotes: {
      cheapest: FlightQuote;
      direct: FlightQuote;
    };
    image: {
      url: string;
    };
    flightRoutes: {
      directFlightsAvailable: boolean;
    };
  };
  entityId: string;
  skyId: string;
}

export interface FlightQuote {
  price: string;
  rawPrice: number;
  direct: boolean;
}
