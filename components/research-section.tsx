'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const researchData = [
  {
    title: 'Metabolic profile of high intensity intermittent exercises',
    authors:
      'Izumi Tabata, Kouichi Irisawa, Motoki Kouzaki, Kouji Nishimura, Futoshi Ogita',
    date: 'March 1997',
    journal: 'Medicine & Science in Sports & Exercise',
    doi: '10.1097/00005768-199703000-00009',
    findings:
      'Introduced a protocol of 20s of ultra-intense exercise (≈170% VO₂max) followed by 10s of rest repeated for 4 minutes. Demonstrated significant improvements in both aerobic and anaerobic capacities, forming the basis of modern HIIT methods.',
  },
  {
    title:
      'Effect of Resistance Training Frequency on Gains in Muscular Strength',
    authors:
      'Jozo Grgic, Brad J. Schoenfeld, Timothy B. Davies, Bruno Lazinica, James W. Krieger',
    date: 'February 2018',
    journal: 'Sports Medicine',
    doi: '10.1007/s40279-017-0869-6',
    findings:
      'When overall training volume is equalized, increasing weekly training frequency beyond one session does not significantly boost muscular strength.',
  },
  {
    title:
      'Effects of Resistance Training Frequency on Measures of Muscle Hypertrophy',
    authors: 'Brad J. Schoenfeld, Dan Ogborn, James W. Krieger',
    date: 'April 2016',
    journal: 'Sports Medicine',
    doi: '10.1007/s40279-016-0543-8',
    findings:
      'Training each muscle group twice per week leads to greater muscle growth compared to once-a-week sessions, highlighting the importance of frequency for hypertrophy when volume is not strictly matched.',
  },
];

const applicationPoints = [
  {
    title: 'HIIT Protocols',
    description:
      "Based on Tabata's study, our short-burst, high-intensity routines are designed to maximize cardiovascular and metabolic benefits in a time-efficient manner.",
  },
  {
    title: 'Resistance Training Frequency',
    description:
      'We structure sessions so that, for muscle growth, targeted muscle groups are trained at least twice per week, while also allowing sufficient recovery to optimize strength gains.',
  },
  {
    title: 'Training to Failure',
    description:
      'We use a strategic approach where training to failure is incorporated occasionally or during the final set of an exercise—balancing maximal hypertrophy stimulus with recovery needs.',
  },
  {
    title: 'Velocity-Based Adjustments',
    description:
      'With tools based on the load-velocity relationship, our trainers can accurately estimate your 1RM and adjust weights in real-time to keep your training both challenging and safe.',
  },
];

export function ResearchSection() {
  return (
    <div className="py-12 mx-32">
      <h2 className="text-3xl font-bold mb-6">
        Evidence-Based Research on Gym Workout Plans
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        Our gym workout programs are designed with a solid foundation in
        scientific research. Below is a curated list of peer-reviewed studies
        spanning several training modalities—from high-intensity interval
        training (HIIT) to resistance training frequency and training-to-failure
        protocols.
      </p>

      <div className="mb-12 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Study Title</TableHead>
              <TableHead className="min-w-[200px]">Authors</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Journal</TableHead>
              <TableHead className="min-w-[300px]">Key Findings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {researchData.map((study, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{study.title}</TableCell>
                <TableCell>{study.authors}</TableCell>
                <TableCell>{study.date}</TableCell>
                <TableCell>{study.journal}</TableCell>
                <TableCell>{study.findings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6">
          How This Research Informs Our Programs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applicationPoints.map((point, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border">
              <h4 className="text-xl font-semibold mb-3">{point.title}</h4>
              <p className="text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
