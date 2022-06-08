<div id="price" class="site-price my-5">
    <div class="container-fluid container-md">
        <?php echo '<h2 class="pt-0 pt-lg-5 mb-5 display-4">' . get_post_field('post_title', 73) . '</h2>'; ?>

        <?php if( have_rows('t_block', 73) ): ?>
            <div class="row">
                <?php while( have_rows('t_block', 73) ): the_row();
                    $image = get_sub_field('img');
                    $text = get_sub_field('txt');
                    ?>
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="row">
                            <div class="col-5 col-sm-auto">
                                <img src="<?php echo $image; ?>" alt="Картинка">
                            </div>
                            <div class="col-7 col-sm d-flex align-items-center">
                                <?php echo $text; ?>
                            </div>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div
        <?php endif; ?>
    </div>
</div>