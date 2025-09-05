import CrimeReportCard from "@/app/reports/components/CrimeReportCard";

export default function Reports(){
    return (
        <div id="reportsContent" className="max-w-7xl mx-auto py-10 space-y-6">
            <CrimeReportCard
                offence="Illegal possession of firearms and ammunition"
                time="1 day ago"
                description="Graffiti on bus stop shelter. Appears to be gang-related tags. City has been notified for cleanup."
                location="Oak Street Bus Stop"
                author="@concerned_citizen"
                likes={15}

            />
            <CrimeReportCard
                offence="Robbery with aggravating circumstances"
                time="3 hours ago"
                description="Armed robbery at a convenience store reported at 7:30 AM today. Suspect fled on foot."
                location="Main Street Market"
                author="@citywatcher"
                likes={22}
                image="https://placehold.co/600x400"
            />

            <CrimeReportCard
                offence="Assault with the intent to inflict grievous bodily harm"
                time="12 hours ago"
                description="Incident reported at 10:30 PM last night involving a fight outside a bar. Victim hospitalized."
                location="Downtown Pub, 3rd Avenue"
                author="@nightpatrol"
                likes={9}
                image="https://placehold.co/600x400"
            />

            <CrimeReportCard
                offence="Burglary at residential premises"
                time="2 days ago"
                description="Break-in reported on Sunday, August 17. Jewelry and electronics stolen."
                location="12 Elm Street"
                author="@neighborhoodalert"
                likes={7}
            />

            <CrimeReportCard
                offence="Drug-related crime"
                time="30 minutes ago"
                description="Suspicious activity near the park at 10:00 AM today. Possible drug deal observed."
                location="Central Park East"
                author="@safetyscanner"
                likes={4}
            />

            <CrimeReportCard
                offence="Theft of motor vehicle"
                time="6 hours ago"
                description="Car stolen from parking lot at 4:30 AM. Black sedan, license plate reported."
                location="City Hall Parking"
                author="@trafficwatch"
                likes={13}
            />
        </div>
    )
}