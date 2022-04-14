import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";

const Timeline = () => {
  const { photos } = usePhotos();

  return (
    <div className='container col-span-2'>
      <p>I am the Timeline</p>
    </div>
  );
};

export default Timeline;
