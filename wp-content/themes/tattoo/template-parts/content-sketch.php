<div id="sketch" class="site-sketch pb-0 pb-lg-5 my-5">
    <div class="container-fluid container-md">
        <?php echo '<h2 class="pt-0 pt-lg-5 mb-5 display-4">' . get_post_field('post_title', 69) . '</h2>'; ?>
    </div>

    <?php $i =0; if (have_rows('t_gallery', 69)): ?>
        <div id="sketchСarousel" class="carousel slide mb-5" data-bs-ride="carousel">
            <div class="carousel-inner">
                <?php while (have_rows('t_gallery', 69)): the_row();
                    $images = get_sub_field('t_photo');
                    $size = 'full';
                    $i++;
                    ?>
                    <div class="carousel-item <?php echo $i === 1? ' active' : ''; ?>">
                        <?php if( $images ): ?>
                            <div class="container-fluid container-md">
                                <div class="row">
                                    <?php foreach( $images as $image_id ): ?>
                                        <div class="col-6 col-md">
                                            <?php echo wp_get_attachment_image( $image_id['ID'], $size ); ?>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        <?php endif; ?>
                    </div>
                <?php endwhile; ?>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#sketchСarousel"
                    data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#sketchСarousel"
                    data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <!-- #sketch -->
    <?php endif; ?>
</div>


