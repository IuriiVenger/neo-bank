import Card from '@/components/ui/Card';

const CardSuccessStep = () => (
  <div className="flex flex-col gap-12">
    <Card provider="Visa" size="md" className=" self-center" />
    <div className="flex flex-col gap-6">
      <h2 className="text-center text-4.25xl  tracking-tighter ">Your card has been created successfully</h2>
      <p className="text-foreground-2 text-center">Your card is ready to use. Please check it out!</p>
    </div>
  </div>
);

export default CardSuccessStep;
