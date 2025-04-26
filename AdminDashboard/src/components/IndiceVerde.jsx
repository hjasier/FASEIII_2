import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const hotels = [
    { id: 0, nombre_hotel: "Alletra Diamond Grand Hotel", slope: 4.9741565569961354e-06, intercept: 0.3300868795792876, confidence: 57.44633078928691 },
    { id: 1, nombre_hotel: "ProLiant Towers", slope: -3.7212748847703678e-06, intercept: 0.3356806810758965, confidence: 55.09942755031653 },
    { id: 2, nombre_hotel: "Aruba Luxury Lodge", slope: -7.920971599958024e-06, intercept: 0.34114270259074697, confidence: 56.60588783066668 },
    { id: 3, nombre_hotel: "InfoSight Boutique Hotel", slope: 5.073408362842357e-06, intercept: 0.3273241802422927, confidence: 56.513932604203646 },
    { id: 4, nombre_hotel: "Primera Grand", slope: -9.584519653846294e-06, intercept: 0.3461988260887105, confidence: 56.892000666097864 },
    { id: 5, nombre_hotel: "dHCI Executive Boutique Hotel", slope: 2.5555184766489044e-06, intercept: 0.33250752031389147, confidence: 56.286775577907896 },
    { id: 6, nombre_hotel: "ProLiant Haven", slope: -4.812151500152101e-06, intercept: 0.33816882794273273, confidence: 54.61377704591525 },
    { id: 7, nombre_hotel: "Apollo Executive Beach Resort", slope: -2.5661374444334917e-06, intercept: 0.33432859551998634, confidence: 57.00921386877257 },
    { id: 8, nombre_hotel: "Aruba Lodge", slope: -3.1450494490324965e-06, intercept: 0.337909050880777, confidence: 54.7357901985693 },
    { id: 9, nombre_hotel: "Alletra Haven", slope: 4.105957524617647e-06, intercept: 0.3308788568298716, confidence: 56.73660748140279 },
    { id: 10, nombre_hotel: "dHCI Platinum Beach Resort", slope: 6.279502140747215e-08, intercept: 0.33518252706923823, confidence: 56.62416782293545 },
    { id: 11, nombre_hotel: "GreenLake Platinum Heritage Inn", slope: -2.9807585252115155e-07, intercept: 0.33436063952279554, confidence: 55.28127788803472 },
    { id: 12, nombre_hotel: "Pointnext Signature Residences & Suites", slope: 1.4875426591732434e-06, intercept: 0.3303305943722599, confidence: 56.27255734751449 },
    { id: 13, nombre_hotel: "ProLiant Place", slope: -1.2570521984492633e-06, intercept: 0.3379736718614089, confidence: 55.650168292098776 },
    { id: 14, nombre_hotel: "Synergy Golden Grand Hotel", slope: 5.4895577573030725e-06, intercept: 0.33007790227508793, confidence: 57.23290269404732 },
    { id: 15, nombre_hotel: "Alletra Resort", slope: -1.8306003269276417e-06, intercept: 0.33727019598542685, confidence: 57.16326309668761 },
    { id: 16, nombre_hotel: "GreenLake Digital Business Suites", slope: -2.3028735422114444e-06, intercept: 0.3373439531008038, confidence: 56.62010630620457 },
    { id: 17, nombre_hotel: "Apollo Resort & Spa", slope: -2.321458002834524e-06, intercept: 0.33700135011548293, confidence: 57.20913119187704 },
    { id: 18, nombre_hotel: "Nimble Inn", slope: 5.749050015500503e-06, intercept: 0.32987233915779834, confidence: 58.88005882773378 },
    { id: 19, nombre_hotel: "Ezmeral Grand Hotel", slope: -6.890170176475453e-06, intercept: 0.3459106534144241, confidence: 57.520391534291775 },
    { id: 20, nombre_hotel: "Alletra Boutique Hotel", slope: -2.303916205410091e-06, intercept: 0.3361361693078616, confidence: 55.099446329201776 },
    { id: 21, nombre_hotel: "Simplivity Golden Plaza Hotel", slope: -4.8259298144757705e-06, intercept: 0.3407094866379718, confidence: 57.345185761531525 },
    { id: 22, nombre_hotel: "Cray Villas", slope: -9.913957782788777e-06, intercept: 0.3481701674232036, confidence: 56.111914563461006 },
    { id: 23, nombre_hotel: "Apollo Diamond Suites", slope: -3.3495750648575923e-06, intercept: 0.3347903601561286, confidence: 58.31011920111597 },
    { id: 24, nombre_hotel: "Apollo Towers", slope: -8.004879723027574e-07, intercept: 0.33612646199950796, confidence: 56.48266403172748 }
  ].sort((a, b) => a.slope - b.slope); // Sort slopes from min to max

const HotelSlopesChart = () => {
  // Normalize slopes for color mapping
  const minSlope = Math.min(...hotels.map(hotel => hotel.slope));
  const maxSlope = Math.max(...hotels.map(hotel => hotel.slope));

  // Custom color function for bars
  const getBarColor = (slope) => {
    // Simple direct approach for clearer colors
    if (slope < 0) {
      // Red with intensity based on the magnitude
      const intensity = Math.abs(slope) / Math.abs(minSlope);
      return `rgb(${Math.round(255 * intensity)}, 0, 0)`;
    } else {
      // Green with intensity based on the magnitude
      const intensity = slope / maxSlope;
      return `rgb(0, ${Math.round(255 * intensity)}, 0)`;
    }
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={hotels} 
          layout="vertical" 
          margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis 
            dataKey="nombre_hotel" 
            type="category" 
            width={250} 
            tickLine={false} 
          />
          <Tooltip 
            formatter={(value, name, props) => {
              const hotel = hotels.find(h => h.nombre_hotel === props.payload.nombre_hotel);
              return [
                `Slope: ${value.toExponential(4)}`, 
                `Confidence: ${hotel.confidence.toFixed(2)}%`
              ];
            }}
          />
          <Bar 
            dataKey="slope" 
            barSize={20}
            label={{
              position: 'left',
              formatter: (value) => value.toExponential(2)
            }}
          >
            {/* Use Cell components to apply individual colors to each bar */}
            {hotels.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.slope)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HotelSlopesChart;